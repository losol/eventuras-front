import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { IconCheck, IconSelector } from '@tabler/icons-react';

export type DropdownOption={
  id:string;
  label:string;
}

export type MultiSelectDropdownProps = {
  id: string;
  options: DropdownOption[];
  onChange:((selected:string[])=>void);
  onBlur:((event:any)=>void)
  selected:string[] //array of ids
};

export default function MultiSelectDropdown({ id, options,onChange,onBlur,selected=[] }: MultiSelectDropdownProps) {
  return (
    <div id={id}>
      <Listbox value={selected} onChange={onChange} multiple>
        <div className="relative mt-1">
          <Listbox.Button onBlur={onBlur} className="relative border-2 bg-gray-100 w-full cursor-default bg-white py-4 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <span className="block truncate">{(selected ?? []).map(id=>options.filter(opt=>opt.id===id)[0].label).join(', ')}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IconSelector className="h-15 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={option.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <IconCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
