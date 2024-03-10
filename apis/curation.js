import axios from 'axios';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from './index';

export const becomeCurator = async (
  desiredEarningPercentage,
  interestedCollabTypes,
) => {
  const f1 = async () => {
    const res = await axios.post(`${BASE_URL}/api/v1/curation/curator`, {
      desiredEarningPercentage,
      interestedCollabTypes,
    });
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};

export const fetchCuratorDetails = async () => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/curation/curator`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};

export const updateCuratorPreferences = async (
  desiredEarningPercentage,
  interestedCollabTypes,
) => {
  const f1 = async () => {
    const res = await axios.patch(`${BASE_URL}/api/v1/curation/curator`, {
      desiredEarningPercentage,
      interestedCollabTypes,
    });
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};

export const sendCurationRequest = async (
  collabId,
  curatorDemandedEarning,
  noteToAdmin,
) => {
  const f1 = async () => {
    const res = await axios.post(`${BASE_URL}/api/v1/curation/curate-collab`, {
      collabId,
      curatorDemandedEarning,
      noteToAdmin,
    });
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};

export const isCurationByLoggedInUserExists = async (collab) => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/curation/curate-collab/status?collab=${collab}`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};

export const fetchCollabCurations = async (collab) => {
  const f1 = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/curation/collab/${collab}`);
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};

export const fetchCollabCurationsByCurator = async () => {
  const f1 = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/v1/curation/curator-collab-curations`,
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};

export const acceptRejectCurationRequest = async (curation, status) => {
  const f1 = async () => {
    const res = await axios.post(
      `${BASE_URL}/api/v1/curation/accept-reject-collab-curation`,
      {
        curationId: curation,
        status,
      },
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};

export const negotiateCollabCuration = async (
  curation,
  negotiatedEarning,
  noteToCurator,
) => {
  const f1 = async () => {
    const res = await axios.post(
      `${BASE_URL}/api/v1/curation/curate-negotiate-admin`,
      {
        curationId: curation,
        subsequentNegotiationEarning: negotiatedEarning,
        noteToCurator,
      },
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};

export const acceptRejectCollabAdminNegotiatedOffer = async (
  curation,
  status,
) => {
  const f1 = async () => {
    const res = await axios.post(
      `${BASE_URL}/api/v1/curation/accept-reject-collab-negotiation`,
      {
        curationId: curation,
        status,
      },
    );
    return res;
  };
  const res = await reFetchTokenExpire(f1, fetchRefreshToken);
  if (res && res.data) {
    return res.data;
  }
};
