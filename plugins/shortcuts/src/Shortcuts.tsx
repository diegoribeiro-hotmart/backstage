/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useMemo } from 'react';
import useObservable from 'react-use/lib/useObservable';
import PlayListAddIcon from '@material-ui/icons/PlaylistAdd';
import { ShortcutItem } from './ShortcutItem';
import { AddShortcut } from './AddShortcut';
import { shortcutsApiRef } from './api';

import {
  Progress,
  SidebarItem,
  SidebarScrollWrapper,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';

export const Shortcuts = () => {
  const shortcutApi = useApi(shortcutsApiRef);
  const shortcuts = useObservable(
    useMemo(() => shortcutApi.shortcut$(), [shortcutApi]),
  );
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>();
  const loading = Boolean(!shortcuts);

  const handleClick = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <SidebarScrollWrapper>
      <SidebarItem
        icon={PlayListAddIcon}
        text="Add Shortcuts"
        onClick={handleClick}
      />
      <AddShortcut
        onClose={handleClose}
        anchorEl={anchorEl}
        api={shortcutApi}
      />
      {loading ? (
        <Progress />
      ) : (
        shortcuts?.map(shortcut => (
          <ShortcutItem
            key={shortcut.id}
            shortcut={shortcut}
            api={shortcutApi}
          />
        ))
      )}
    </SidebarScrollWrapper>
  );
};
