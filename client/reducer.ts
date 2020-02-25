const initialState = {
  cameraPermission: false,
  galleryPermission: false,
  activePhoto: null,
  loadingStatus: false,
  uiMessage: null,
  uploadMode: null,
  language: "English",
  processedText: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_UPLOAD_MODE": {
      const { mode } = action;
      return {
        ...state,
        uploadMode: mode
      };
    }
    case "SET_LANGUAGE": {
      const { chosenLanguage } = action;
      return {
        ...state,
        language: chosenLanguage
      };
    }
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
    case "SET_PROCESSED_TEXT": {
      const { text } = action;
      return {
        ...state,
        processedText: text
      };
    }
    default:
      return { ...state };
  }
};
