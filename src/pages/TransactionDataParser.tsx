import { useState } from 'react';
import { ethers } from 'ethers';
import classNames from 'classnames';

export default function TransactionDataParser() {
  const [abi, setAbi] = useState('');
  const [data, setData] = useState('');
  let iface: undefined | ethers.utils.Interface;
  let txDesc;
  let invalidAbi = false;
  let invalidTx = false;
  try {
    iface = new ethers.utils.Interface(abi);
    try {
      txDesc = iface.parseTransaction({ data });
    } catch (e) {
      console.log(e);
      invalidTx = true;
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
        <label>Transaction Data</label>
        <textarea
          className={classNames('nes-textarea nes-pointer is-dark', {
            'is-error': invalidTx,
          })}
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder='0x0'
        />
      </div>
      <br />
      {txDesc && (
        <>
          <>{txDesc.signature}</>
          <br />
          {Object.entries(txDesc.args).map(([name, arg], idx) => (
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
