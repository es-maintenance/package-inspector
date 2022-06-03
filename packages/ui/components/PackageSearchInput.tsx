import { gql } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, InputBase, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  PackagesSearchedByKeyFragment,
  usePackagesBySearchKeyQuery,
} from '../graphql/generated/client';

gql`
  fragment PackagesSearchedByKey on Package {
    name
    version
    id
  }

  query PackagesBySearchKey($packageName: String!, $first: Int) {
    packagesBySearchKey(packageName: $packageName, first: $first) {
      totalCount
      nodes {
        ...PackagesSearchedByKey
      }
    }
  }
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const PackageSearchInput: React.FC = () => {
  const router = useRouter();
  const [value, setValue] =
    React.useState<PackagesSearchedByKeyFragment | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<
    readonly (PackagesSearchedByKeyFragment | null)[]
  >([]);

  const { data, loading, error } = usePackagesBySearchKeyQuery({
    variables: {
      first: 10,
      packageName: inputValue,
    },
  });

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    if (
      data?.packagesBySearchKey?.nodes &&
      data?.packagesBySearchKey?.nodes.length > 0
    ) {
      setOptions(data.packagesBySearchKey.nodes);
    }

    return () => {
      active = false;
    };
  }, [data?.packagesBySearchKey.nodes, inputValue, value]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      getOptionLabel={(option) => (option ? option.id : 'N/A')}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(
        event: any,
        newValue: PackagesSearchedByKeyFragment | null
      ) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);

        router.push(
          `/packages/${encodeURIComponent(newValue?.name || '')}/${
            newValue?.version || ''
          }`
        );
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={params.inputProps}
            />
          </Search>
        </div>
      )}
      isOptionEqualToValue={(option, value) => {
        return option?.id === value?.id;
      }}
      renderOption={(props, option: PackagesSearchedByKeyFragment | null) => {
        return (
          <li {...props}>
            <Typography variant="body2" color="text.secondary">
              {option?.id ?? 'N/A'}
            </Typography>
          </li>
        );
      }}
    />
  );
};
