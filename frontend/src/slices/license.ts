import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AppThunk } from 'src/store';
import api from '../utils/api';

const basePath = 'license';

interface LicenseState {
  isLicenseValid: boolean | null;
}

const initialState: LicenseState = {
  isLicenseValid: null
};

const slice = createSlice({
  name: 'license',
  initialState,
  reducers: {
    getLicenseValidity(
      state: LicenseState,
      action: PayloadAction<{ validity: boolean }>
    ) {
      const { validity } = action.payload;
      state.isLicenseValid = validity;
    }
  }
});

export const reducer = slice.reducer;

export const getLicenseValidity = (): AppThunk => async (dispatch) => {
  try {
    const data = await api.get<{ success: boolean }>(`${basePath}/validity`);
    dispatch(slice.actions.getLicenseValidity({ validity: !!data?.success }));
  } catch (err: any) {
    // api.ts baca Error sa JSON stringom u message, npr:
    // {"status":403,"statusText":"Forbidden","body":null}
    let status: number | undefined;

    try {
      const parsed = JSON.parse(err?.message || '');
      status = parsed?.status;
    } catch (parseErr) {
      // ignore
    }

    // 403 = očekivano stanje bez licence, ne smije rušiti app init
    if (status === 403) {
      dispatch(slice.actions.getLicenseValidity({ validity: false }));
      return;
    }

    // fallback za ostale greške
    dispatch(slice.actions.getLicenseValidity({ validity: false }));
  }
};

export default slice;
