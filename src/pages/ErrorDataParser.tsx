import { useState } from 'react';
import { ethers } from 'ethers';
import classNames from 'classnames';

export default function ErrorDataParser() {
  const [abi, setAbi] = useState('');
  const [data, setData] = useState('');
  let iface: undefined | ethers.utils.Interface;
  let errorDesc;
  let invalidAbi = false;
  let invalidError = false;
  try {
    iface = new ethers.utils.Interface(abi);
    try {
      errorDesc = iface.parseError(data);
    } catch (e) {
      console.log(e);
      invalidError = true;
    }
  } catch (e) {
    console.log(e);
    invalidAbi = true;
  }
  return (
    <>
      <div className='nes-field'>
        <label>ABI</label>
        <textarea
          className={classNames('nes-textarea nes-pointer is-dark', {
            'is-error': invalidAbi,
          })}
          value={abi}
          onChange={(e) => setAbi(e.target.value)}
          placeholder='[]'
        />
      </div>
      <br />
      <div className='nes-field'>
        <label>Error Data</label>
        <textarea
          className={classNames('nes-textarea nes-pointer is-dark', {
            'is-error': invalidError,
          })}
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder='0x0'
        />
      </div>
      <br />
      {errorDesc && (
        <>
          <>{errorDesc.signature}</>
          <br />
          {Object.entries(errorDesc.args).map(([name, arg], idx) => (
            <div key={idx}>
              {name}: {arg.toString()}
            </div>
          ))}
          <br />
        </>
      )}
    </>
  );
}
