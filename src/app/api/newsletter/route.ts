import { connectToDatabase } from "@/lib/utils";
import NewsletterModel from "@/models/newsletterModel";
import { NextRequest, NextResponse } from "next/server";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const LoadDb = async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

LoadDb();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// GET SUBSCRIBERS DATA
export async function GET() {

  const subscribers = await NewsletterModel.find({}).sort({ date: -1 });
  return NextResponse.json({ subscribers });

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// POST SUBSCRIBER DATA
export async function POST(request:NextRequest) {
  try {
    const formData = await request.formData();
    const email = `${formData.get("email")}`;

    // -------------------------------------------------------------------------------

    // Check if the email already exists in the `newsletter` collection
    const newsletterExists = await NewsletterModel.findOne({ email });
    if (newsletterExists) {
      return NextResponse.json(
        {
          success: false,
          msg: "Email is already subscribed to the newsletter",
        },
        { status: 409 }
      );
    }

    // -------------------------------------------------------------------------------

    // Add new email
    await NewsletterModel.create({ email });

    // -------------------------------------------------------------------------------
    
    return NextResponse.json(
      { success: true, msg: "Subscriber added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(`Error Adding Subscriber: ${(error as Error).message}`);
    return NextResponse.json({ success: false, msg: "Failed to add Subscriber" }, { status: 500 });
  }
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/// DELETE SUBSCRIBER
export async function DELETE(request: NextRequest) {

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, msg: "ID is required" },
        { status: 400 }
      );
    }

    // -------------------------------------------------------------------------------

    const report = await NewsletterModel.findById(id);
    if (!report) {
      return NextResponse.json(
        { success: false, msg: "Subscriber not found" },
        { status: 404 }
      );
    }

    // -------------------------------------------------------------------------------

    await NewsletterModel.findByIdAndDelete(id);
    console.log("Subscriber Deleted");

    // -------------------------------------------------------------------------------

    return NextResponse.json({
      success: true,
      msg: "Subscriber deleted successfully",
    });
  } catch (error) {
    console.error(`Error deleting NewsLetter: ${(error as Error).message}`);
    return NextResponse.json({ success: false, msg: "Failed to delete Subscriber" }, { status: 500 });
  }
}