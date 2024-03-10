/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import AppContext from 'context/AppContext';
import CommandPalette, { getItemIndex } from 'react-cmdk';
import { useRouter } from 'next/router';
import { copyToClipBoard } from '~/utils';
import { APP_URL } from '~/apis';
import { setCurrentThemeMode } from '~/redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNotistack, useProtectedAction } from '~/hooks';

const CmdkProvider = ({children}) => {
  const { user } = useContext(AppContext);
  const [page] = useState("root");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { themeMode } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const generateSnackbar = useNotistack();

  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e) {
      // Check if it's Mac
      const isMac = window.navigator.platform.toUpperCase().includes('MAC');

      // Check for 'Cmd + K' on Mac or 'Ctrl + K' on Windows/Linux
      if ((isMac && e.metaKey && e.key === "k") || (!isMac && e.ctrlKey && e.key === "k")) {
        e.preventDefault();
        e.stopPropagation();

        setOpen((currentValue) => {
          return !currentValue;
        });
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const enhancedFilterItems = (items, query) => {
    if (!query) return items;

    const queryWords = query.toLowerCase().split(/\s+/);

    return items.filter(section => {
      const filteredItems = section.items.filter(item => {
        const itemText = item.children.toLowerCase();

        return queryWords.every(word => itemText.includes(word));
      });

      // Only return sections that have at least one item that matches the query
      if (filteredItems.length > 0) {
        return {
          ...section,
          items: filteredItems
        };
      }
      return false;
    });
  }

  const filteredItems = enhancedFilterItems(
    [
      {
        heading: "Collaborations",
        id: "collaborations",
        items: [
          {
            id: "Initiate New Collab",
            children: "Initiate New Collab",
            icon: "RectangleStackIcon",
            href: "/collab/create",
            hideOnProfileNotComplete: true
          },
          {
            id: "Add an Existing Collab",
            children: "Add an Existing Collab",
            icon: "RectangleStackIcon",
            href: "/collab/existing/create",
            hideOnProfileNotComplete: true
          },
        ],
      },
      {
        heading: "Profile",
        id: "profile",
        items: [
          {
            id: "share-profile",
            children: "Share Your Profile",
            icon: "CodeBracketIcon",
            action: () => {
              if (!user){
                generateSnackbar('Please login to share profile', 'error')
              }else {
                copyToClipBoard(`${APP_URL}/@${user?.username}`);
                generateSnackbar("Profile link copied to clipboard", "success");
              }
            },
          },
          {
            id: "refine-details",
            children: "Refine Your Details",
            icon: "LifebuoyIcon",
            href: "/settings?view=profile",
            hideOnProfileNotComplete: true
          },
          {
            id: "Open Your Inbox",
            children: "Open Your Inbox",
            icon: "ArrowRightOnRectangleIcon",
            href: "/inbox",
            hideOnProfileNotComplete: true
          },
        ],
      },
      {
        heading: "Discovery",
        id: "Discovery",
        items: [
          {
            id: "Go to Dashboard",
            children: "Go to Dashboard",
            "href": "/dashboard"
          },
          {
            id: "Discover Collabs",
            children: "Discover Collabs",
            "href": "/collabs/explore"
          },
          {
            id: "Search Collaborations",
            children: "Search Collaborations",
            "href": "/search?q=[id]"
          }
        ]
      },
      {
        heading: "Settings",
        id: "Settings",
        items: [
          {
            id: "Connect Socials",
            children: "Connect Socials",
            action: () => {
              if (!user){
                generateSnackbar("Please login to connect socials", "error")
              }else {
                router.push('/settings')
              }
            },
          },
          {
            id: "Change Dark/Light Mode",
            children: "Change Dark/Light Mode",
            action: () => dispatch(
              setCurrentThemeMode({
                mode: themeMode === 'dark' ? 'light' : 'dark',
                setLocalStorage: true,
              }),
            )
          }
        ]
      }
    ],
    search
  );
  const startCollab = useProtectedAction(
    (data) => {
      router.push(data);
    }
  );
  const handleClick = (data, event) => {
    event.preventDefault();
    if (data.hideOnProfileNotComplete){
      startCollab(data.href, true);
    }
    if (data.action){
      data.action()
    }else {
      router.push(data.href)
    }
  }

  return (
    <>
      <CommandPalette
        onChangeSearch={setSearch}
        onChangeOpen={setOpen}
        search={search}
        isOpen={open}
        page={page}
      >
        <CommandPalette.Page id="root">
          {filteredItems.length ? (
            filteredItems.map((list) => (
              <CommandPalette.List key={list.id} heading={list.heading}>
                {list.items.map(({ id, ...rest }) => (
                  <CommandPalette.ListItem
                    key={id}
                    index={getItemIndex(filteredItems, id)}
                    onClick={(event) => handleClick(rest, event)}
                    {...rest}
                  />
                ))}
              </CommandPalette.List>
            ))
          ) : (
            <CommandPalette.FreeSearchAction />
          )}
        </CommandPalette.Page>

        <CommandPalette.Page id="collabs">
          <CommandPalette.List heading="Collabs">
            <CommandPalette.ListItem
              index={0}
              id="collab-1"
              children="Collab 1"
              icon="HomeIcon"
              onClick={() => router.push('/dashboard')}
            />
          </CommandPalette.List>

        </CommandPalette.Page>
      </CommandPalette>
      {children}
    </>
  );
};

export default CmdkProvider;