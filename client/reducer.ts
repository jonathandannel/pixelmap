const initialState = {
  cameraPermission: false,
  galleryPermission: false,
  activePhoto: null,
  loadingStatus: false,
  uiMessage: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CAMERA_PERMISSION": {
      const { permission } = action;
      return {
        ...state,
        cameraPermission: permission
      };
    }
    case "SET_GALLERY_PERMISSION": {
      const { permission } = action;
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
    case "SET_LOADING_STATUS": {
      const { status } = action;
      return {
        ...state,
        loadingStatus: status
      };
    }
    case "SET_UI_MESSAGE": {
      const { message } = action;
      return {
        ...state,
        uiMessage: message
      };
    }
    default:
      return { ...state };
  }
};
