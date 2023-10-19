'use client';
import { UserDto } from '@losol/eventuras/models/UserDto';
import React, { useRef, useState,Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react'
import { ApiResult } from '@/utils/api';
import Loading from '../ui/Loading';

export type InputTextProps = {
  [x: string]: any;
};
/**
 * Basic text input field
 * requires ref forwarding because it is used by react hooks
 * @see https://stackoverflow.com/questions/67877887/react-hook-form-v7-function-components-cannot-be-given-refs-attempts-to-access
 */
export const defaultInputStyle = ` 
        appearance-none
        w-full 
        p-4
        text-gray-900
        dark:text-gray-100
        bg-gray-100
        dark:bg-gray-800
        border-2
        dark:border-gray-700
        leading-tight 
        focus:outline-none 
        focus:shadow-outline`;

export const lightInputStyle = `
        appearance-none
        w-full 
        p-4
        bg-white
        text-black
        border-2
        dark:border-gray-400
        focus:outline-none 
        focus:shadow-outline`;

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
  const oProps = { ...props };
  delete oProps.children;
  delete oProps.type;
  delete oProps.className;
  const id = props.id ?? props.name;
  return (
    <div className="mb-3">
      {props.label && <label htmlFor={id}>{props.label}</label>}
      <input
        id={id}
        ref={ref}
        className={`${props.className ?? ''}`}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        {...oProps}
      />
      {props.errors && (
        <label htmlFor={id} role="alert" className="text-red-500">
          {props.errors[props.name]?.message}
        </label>
      )}
    </div>
  );
});

InputText.displayName = 'InputText';

export const InputDate = React.forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
  const oProps = { ...props };
  delete oProps.children;
  delete oProps.type;
  delete oProps.className;
  const id = props.id ?? props.name;
  return (
    <div className="mb-3">
      {props.label && <label htmlFor={id}>{props.label}</label>}
      <input
        id={id}
        ref={ref}
        className={`${props.className ?? ''}`}
        type="date"
        placeholder={props.placeholder}
        {...oProps}
      />
      {props.errors && (
        <label htmlFor={id} role="alert" className="text-red-500">
          {props.errors[props.name]?.message}
        </label>
      )}
    </div>
  );
});
InputDate.displayName = 'InputDate';

export type DataProviderResponse = {
  data?: Array<any> | null;
};

export type AutoCompleteDataProvider = (options: {
  query?: string;
}) => Promise<ApiResult<DataProviderResponse>>;

export type InputAutoCompleteProps = {
  id: string;
  resetAfterSelect?: boolean;
  placeholder?: string;
  dataProvider: AutoCompleteDataProvider;
  minimumAmountOfCharacters: number;
  labelProperty: string;
  onItemSelected?: (u: any) => void;
};

export const InputAutoComplete = (props: InputAutoCompleteProps) => {
  const [selected, setSelected] = useState<UserDto | null>(null)
  const intervalId = useRef(-1);
  const [response, setResponse] = useState<DataProviderResponse | null>(null);
  const localCache = useRef<Map<string, DataProviderResponse>>(new Map());
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState<boolean>(false);
  let viewedData=[]
  if(response?.data && response.data.length){
    viewedData=response.data
  }
  const handleInputChanged = (searchString: string) => {
    const cacheHit = localCache.current.get(searchString);
    if (cacheHit) {
      setResponse(cacheHit);
      return;
    }
    if (searchString.length >= props.minimumAmountOfCharacters) {
      setLoading(true);
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = setTimeout(async () => {
          const userResponse = await props.dataProvider({ query: searchString });
          if (userResponse.ok) {
            setLoading(false);
            localCache.current.set(searchString, userResponse.value);
            setResponse(userResponse.value);
          }
        }, 500) as unknown as number;
      }
    }
  };


  return (
    <div className="w-72">
      <Combobox value={selected} onChange={(u:any)=>{
        setSelected(u)
        if(props.onItemSelected){
          props.onItemSelected(u)
        }
      }}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person:any) => person?.name}
              onChange={(event) => handleInputChanged(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <div
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {viewedData.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                viewedData.map((person:UserDto) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <div className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
        {loading && (
        <div className="scale-[0.8] mt-[-2px] absolute right-0 p-2 top-1">
          <Loading />
        </div>
      )}
      </Combobox>
    </div>
  )
}
/*
export const InputAutoComplete = (props: InputAutoCompleteProps) => {
  const intervalId = useRef(-1);
  const inputRef = useRef(null);
  const [response, setResponse] = useState<DataProviderResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  //caches results per search string
  const localCache = useRef<Map<string, DataProviderResponse>>(new Map());

  const clearTextHandler = () => {
    if (inputRef) {
      (inputRef.current as any).value = '';
    }
  };

  const handleOptionSelected = (optionId: string) => {
    if (inputRef.current) {
      const data = response?.data ?? [];
      const selectedUser: any = data.filter(val => val.id === optionId)[0];
      (inputRef.current as any).value = selectedUser[props.labelProperty];

      if (props.onItemSelected) props.onItemSelected(selectedUser);
      if (props.resetAfterSelect === true) {
        clearTextHandler();
      }
    }
  };

  const handleInputChanged = (searchString: string) => {
    const cacheHit = localCache.current.get(searchString);
    if (cacheHit) {
      setResponse(cacheHit);
      return;
    }
    if (searchString.length >= props.minimumAmountOfCharacters) {
      setLoading(true);
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = setTimeout(async () => {
          const userResponse = await props.dataProvider({ query: searchString });
          if (userResponse.ok) {
            setLoading(false);
            localCache.current.set(searchString, userResponse.value);
            setResponse(userResponse.value);
          }
        }, 500) as unknown as number;
      }
    }
  };

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    // This checks the source of the change, 'insertReplacementText'
    // though not exposed through React typing (hence cast to any), is in fact browser supported
    // if the source is the data option, it needs to prevent another network call being put out
    if ((e.nativeEvent as any).inputType === 'insertReplacementText') {
      handleOptionSelected(e.currentTarget.value);
    } else {
      handleInputChanged(e.currentTarget.value);
    }
  };
  return (
    <div className="relative">
      <InputText
        ref={inputRef}
        id={props.id}
        list={`${props.id}_list`}
        className={defaultInputStyle}
        placeholder={props.placeholder}
        onChange={inputChangeHandler}
      />

      {loading && (
        <div className="scale-[0.8] mt-[-2px] absolute right-0 p-2 top-1">
          <Loading />
        </div>
      )}
      {!loading && (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key == 'Escape') {
              clearTextHandler();
            }
          }}
          className="block bg-black  p-3 absolute right-1 top-1 rounded cursor-pointer bg-opacity-70"
          onClick={clearTextHandler}
        >
          <span className="pointer-events-none">&#x2715;</span>
        </div>
      )}

      <datalist id={`${props.id}_list`}>
        {response?.data &&
          response.data.map((val: UserDto) => (
            <option value={val.id!} label={val.name!} key={val.id!}></option>
          ))}
      </datalist>
    </div>
  );
};*/
