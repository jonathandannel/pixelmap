const initialState = {
  cameraPermission: false,
  galleryPermission: false,
  activePhoto: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CAMERA_PERMISSION": {
      const { permission } = action;
      console.log("CAMERA");
      return {
        ...state,
        cameraPermission: permission
      };
    }
    case "SET_GALLERY_PERMISSION": {
      const { permission } = action;
      console.log("GALLERY");
      return {
        ...state,
        galleryPermission: permission
      };
    }
    case "SET_ACTIVE_PHOTO": {
      const { photo } = action;
      return {
        ...state,
        activePhoto: photo
      };
    }
    default:
      return { ...state };
  }
};
