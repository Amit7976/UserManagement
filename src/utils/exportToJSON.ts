import { User } from "@/lib/types/user";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const exportToJSON = (users: User[]) => {
  const blob = new Blob([JSON.stringify(users, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "users.json";
  link.click();
};

export default exportToJSON;
