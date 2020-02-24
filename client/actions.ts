export const setActivePhoto = photo => ({
  type: "SET_ACTIVE_PHOTO",
  photo
});

export const setCameraPermission = permission => ({
  type: "SET_CAMERA_PERMISSION",
  permission
});

export const setGalleryPermission = permission => ({
  type: "SET_GALLERY_PERMISSION",
  permission
});

export const setLoadingStatus = status => ({
  type: "SET_LOADING_STATUS",
  status
});

export const setUiMessage = message => ({
  type: "SET_UI_MESSAGE",
  message
});

export const setUploadMode = mode => ({
  type: "SET_UPLOAD_MODE",
  mode
});

export const setLanguage = language => ({
  type: "SET_LANGUAGE",
  language
});
