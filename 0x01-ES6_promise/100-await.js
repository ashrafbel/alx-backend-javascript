import uploadPhoto from './utils.js';
import createUser from './utils.js';

const asyncUploadUser = async () => {
  try {
    const photoResponse = await uploadPhoto('photo-profile-1.jpg');
    const userResponse = await createUser('Guillaume', 'Salva');
    
    return {
      photo: photoResponse,
      user: userResponse,
    };
  } catch (error) {
    return {
      photo: null,
      user: null,
    };
  }
};

export default asyncUploadUser;
