import { useState } from 'react';
import { ethers } from 'ethers';
import classNames from 'classnames';

export default function UnitConverter() {
  const [input, setInput] = useState('');
  const [conversion, setConversion] = useState('parseUnits');
  const [decimals, setDecimals] = useState('');
  let output;
  let invalidConversion = false;
  let invalidInput = false;
  let invalidDecimals = false;
  try {
    if (conversion === 'parseUnits' || conversion === 'formatUnits') {
      output = ethers.utils[conversion](input, decimals);
    } else {
      invalidConversion = true;
    }
  } catch (e) {
    console.log(e);
    invalidInput = true;
    invalidDecimals = true;
  }
  return (
    <>
      <div className='nes-field'>
        <label>Input</label>
        <input
          type='text'
          className={classNames('nes-input nes-pointer is-dark', {
            'is-error': invalidInput,
          })}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='1000000000000000000'
        />
      </div>
      <br />
      <div className='nes-field'>
        <label>Decimals</label>
        <input
          type='number'
          step='1'
          min='0'
          className={classNames('nes-input nes-pointer is-dark', {
            'is-error': invalidDecimals,
          })}
          value={decimals}
          onChange={(e) => setDecimals(e.target.value)}
          placeholder='18'
        />
      </div>
      <br />
      <div className='nes-field'>
        <label>Conversion</label>
        <div
          className={classNames('nes-select nes-pointer is-dark', {
            'is-error': invalidConversion,
          })}
        >
          <select
            value={conversion}
            onChange={(e) => setConversion(e.target.value)}
          >
            <option value='parseUnits'>Parse Units (decimal -&gt; uint)</option>
            <option value='formatUnits'>
              Format Units (uint -&gt; decimal)
            </option>
          </select>
        </div>
      </div>
      <br />
      <>{output?.toString()}</>
    </>
  );
}
