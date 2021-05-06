import * as fapi from "shared/fixtures";

export const useViewer = () => {
    return fapi.users.__VIEWER;
};

export const useViewerWallet = () => useViewer().wallet;
