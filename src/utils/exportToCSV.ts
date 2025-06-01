import { User } from "@/lib/types/user";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const exportToCSV = (users: User[]) => {
  if (!users || users.length === 0) return;

  const headers = [
    "Name",
    "Username",
    "Email",
    "Phone",
    "Website",
    "Street",
    "Suite",
    "City",
    "Zipcode",
    "Lat",
    "Lng",
    "Company Name",
    "Catch Phrase",
    "BS",
  ];

  const rows = users.map((user) => [
    user.name,
    user.username || "",
    user.email,
    user.phone || "",
    user.website || "",
    user.address?.street || "",
    user.address?.suite || "",
    user.address?.city || "",
    user.address?.zipcode || "",
    user.address?.geo?.lat || "",
    user.address?.geo?.lng || "",
    user.company?.name || "",
    user.company?.catchPhrase || "",
    user.company?.bs || "",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "users.csv";
  link.click();
};

export default exportToCSV;
