import { connectToDatabase } from "@/lib/utils";
import { User } from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// POST - Add a new user
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { title, url, image, date, location, email } = body;

    // -------------------------------------------------------------------------------

    if (!title || !url || !image || !date || !location || !email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // -------------------------------------------------------------------------------

    const newUser = new User({ title, url, image, date, location, email });
    await newUser.save();

    // -------------------------------------------------------------------------------

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// GET - Fetch all users
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: String(error),
      },
      { status: 500 }
    );
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// DELETE - Delete a user by ID (pass id in query)
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // -------------------------------------------------------------------------------

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // -------------------------------------------------------------------------------

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // -------------------------------------------------------------------------------

    return NextResponse.json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
