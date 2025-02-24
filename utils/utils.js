export function validateWarehouseData(data) {
  if (
    !data.warehouse_name ||
    !data.address ||
    !data.city ||
    !data.country ||
    !data.contact_name ||
    !data.contact_position ||
    !data.contact_phone ||
    !data.contact_email
  ) {
    return { isValid: false, message: "All fields are required" };
  }

  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailFormat.test(data.contact_email)) {
    return { isValid: false, message: "Invalid email format" };
  }

  return { isValid: true };
}

export function validateInventoryData(data) {
  if (
    !data.warehouse_id ||
    !data.item_name ||
    !data.description ||
    !data.category ||
    !data.status ||
    typeof data.quantity !== "number"
  ) {
    return {
      isValid: false,
      message: "All fields are required, and quantity must be a number",
    };
  }

  return { isValid: true };
}
