import * as Permissions from "expo-permissions";

// Takes a boolean state setter
export const getGalleryPermissions = async cb => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    cb(true);
  }
};

// Takes a boolean state setter
export const getCameraPermissions = async cb => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (status === "granted") {
    cb(true);
  }
};
