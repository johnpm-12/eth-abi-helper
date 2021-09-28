import { useState } from 'react';
import { ethers } from 'ethers';
import classNames from 'classnames';

export default function FragmentSignature() {
  const [abi, setAbi] = useState('');
  const [fragment, setFragment] = useState('');
  let iface: undefined | ethers.utils.Interface;
  let sigHash;
  let invalidAbi = false;
  let invalidFragment = false;
  try {
    iface = new ethers.utils.Interface(abi);
    try {
      sigHash = iface.getSighash(fragment);
    } catch (e) {
      console.log(e);
      try {
        sigHash = iface.getEventTopic(fragment);
      } catch (e) {
        console.log(e);
        invalidFragment = true;
      }
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
        <label>Fragment</label>
        <div
          className={classNames('nes-select nes-pointer is-dark', {
            'is-error': invalidFragment,
          })}
        >
          <select
            value={fragment}
            onChange={(e) => setFragment(e.target.value)}
          >
            {iface && (
              <>
                {iface.deploy.name && (
                  <>
                    <option disabled>-- Constructor --</option>
                    <option disabled>{iface.deploy.name}</option>
                  </>
                )}
                <option disabled>-- Functions --</option>
                {Object.entries(iface.functions).map(([funcName], idx) => (
                  <option key={idx}>{funcName}</option>
                ))}
                <option disabled>-- Events --</option>
                {Object.entries(iface.events).map(([eventName], idx) => (
                  <option key={idx}>{eventName}</option>
                ))}
                <option disabled>-- Errors --</option>
                {Object.entries(iface.errors).map(([errName], idx) => (
                  <option key={idx}>{errName}</option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>
      <br />
      <>{sigHash}</>
    </>
  );
}
