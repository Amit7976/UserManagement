import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModal";
import RemoveUser from "@/models/removeUser";
import { connectToDatabase } from "@/lib/utils";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let cachedFakeApiIds: number[] | null = null;

async function getFakeApiIds() {
  if (cachedFakeApiIds) return cachedFakeApiIds;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    cachedFakeApiIds = data.map((user: { id: number }) => user.id);
    return cachedFakeApiIds;
  } catch (error) {
    console.error("Failed to fetch fake API users", error);
    return [];
  }
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export async function GET() {
  await connectToDatabase();
  const users = await User.find({});
  const removeUser = await RemoveUser.find({});
  return NextResponse.json({
    users,
    removeUser,
  });
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const newUser = new User(body);
  await newUser.save();
  return NextResponse.json(newUser, { status: 201 });
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const data = await req.json();
  const userId = data._id || null;
  const apiId = data.id;

  if (userId && userId.length >= 24) {
    const existingUser = await User.findById(userId);
    if (existingUser) {
      const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
      });
      return NextResponse.json(updatedUser);
    }
  }

  if (!apiId) {
    return NextResponse.json(
      { message: "id (api id) is required" },
      { status: 400 }
    );
  }

  const fakeApiIds = await getFakeApiIds();

  const existingByApiId = await User.findOne({ id: apiId });
  if (existingByApiId) {
    const updatedUser = await User.findOneAndUpdate({ id: apiId }, data, {
      new: true,
    });
    return NextResponse.json(updatedUser);
  }

  if (fakeApiIds!.includes(apiId)) {
    if (data._id && data._id.length < 24) {
      delete data._id;
    }
    await RemoveUser.updateOne({ id: apiId }, { id: apiId }, { upsert: true });
    const newUser = new User(data);
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  }

  return NextResponse.json(
    { message: "User not found to update" },
    { status: 404 }
  );
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { id } = body;

  const fakeApiIds = await getFakeApiIds();

  if (id) {
    if (id.length >= 24) {
      const existingUser = await User.findOne({ _id: id });
      if (existingUser) {
        await User.deleteOne({ _id: id });
        return NextResponse.json({ message: "User deleted by id" });
      }
    }

    if (fakeApiIds!.includes(id)) {
      await RemoveUser.updateOne({ id }, { id }, { upsert: true });
      return NextResponse.json({
        message: "User id added to removeUser collection",
      });
    }
  }

  return NextResponse.json(
    { message: "User id not found to delete" },
    { status: 404 }
  );
}