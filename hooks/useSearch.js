import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, fetchRefreshToken, reFetchTokenExpire } from '~/apis';
import { useDebounce } from 'react-use';
import AppContext from 'context/AppContext';

const useSearch = (isContributed = false, collabId = null) => {
  const [userSearchItems, setUserSearchItems] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const { user } = useContext(AppContext);

  useEffect(() => {
    setLoggedInUser(user?.userId);
  }, [user]);

  const searchUser = async (searchString) => {
    try {
      setLoading(true);
      const f1 = async () => {
        const res = await axios.get(`${BASE_URL}/creator`, {
          params: {
            searchTags: [searchString],
            isContributed,
            collabId,
          },
        });
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);
      setLoading(false);

      const searchItems = res.data.creators.map(
        ({
          imageUrl,
          username,
          fullName,
          _id,
          skills,
          connections,
          totalCollabs,
          socials,
          isInvited,
        }) => {
          let twitter;
          socials.forEach((social) => {
            if (social.name === 'twitter') {
              twitter = social.value;
            }
          });

          return {
            _id,
            image: imageUrl,
            label: username,
            connections,
            totalCollabs,
            value: username,
            skill: skills?.[0],
            type: 'internalUser',
            twitter,
            fullName,
            isInvited,
          };
        },
      );

      let updatedUserSearchItems = searchItems;

      if (loggedInUser) {
        updatedUserSearchItems = searchItems.filter(
          (item) => item._id !== loggedInUser,
        );
      }

      setUserSearchItems(updatedUserSearchItems);
    } catch (err) {
      //
    }
  };

  useDebounce(
    () => {
      if (searchString) {
        searchUser(searchString);
      } else {
        searchUser('');
      }
    },
    500,
    [searchString],
  );

  return {
    userSearchItems,
    searchString,
    setSearchString,
    loading,
    setUserSearchItems,
  };
};

export default useSearch;
