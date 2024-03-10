import axios from 'axios';
import config from '../config';
// import { fetchRefreshToken, reFetchTokenExpire } from './index';

export const BASE_URL = config.BASE_URL;

export const fetchCollabTemplateDetails = async (collabTemplateId) => {
  try {
    const nonInterceptedAxios = axios.create();
    const response = await nonInterceptedAxios.get(
      `${BASE_URL}/api/v1/collab-template/${collabTemplateId}`,
    );

    const { data } = response;
    return data;
  } catch (err) {
    return {
      status: 'error',
      data: {
        message: 'Something went wrong or template not found!',
      },
    };
  }
};

export const fetchCollabTemplates = async (page, limit, randomize = false) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/collab-template?page=${page}&limit=${limit}&randomize=${randomize}`,
    );

    const { data } = response;
    return data;
  } catch (err) {
    return {
      status: 'error',
      data: {
        message: 'Something went wrong or collab not found!',
      },
    };
  }
};
