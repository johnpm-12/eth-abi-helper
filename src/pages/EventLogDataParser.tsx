import { useState } from 'react';
import { ethers } from 'ethers';
import classNames from 'classnames';

export default function EventLogDataParser() {
  const [abi, setAbi] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [datas, setDatas] = useState<string[]>([]);
  let iface: undefined | ethers.utils.Interface;
  let logDesc;
  let invalidAbi = false;
  let invalidLog = false;
  try {
    iface = new ethers.utils.Interface(abi);
    try {
      logDesc = iface.parseLog({ topics, data: `0x${datas.join('')}` });
    } catch (e) {
      console.log(e);
      invalidLog = true;
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
        <label>Topics Data</label>
        {topics.map((topic, idx) => (
          <input
            key={idx}
            type='text'
            className={classNames('nes-input nes-pointer is-dark', {
              'is-error': invalidLog,
            })}
            value={topic}
            onChange={(e) => {
              setTopics((prevTopics) => {
                const newTopics = [...prevTopics];
                if (e.target.value) {
                  newTopics[idx] = e.target.value;
                } else {
                  newTopics.splice(idx, 1);
                }
                return newTopics;
              });
            }}
            placeholder='0x0'
          />
        ))}
        <input
          key={topics.length}
          type='text'
          className={classNames('nes-input is-dark', {
            'is-error': invalidLog,
          })}
          value={''}
          onChange={(e) => {
            setTopics((prevTopics) => {
              const newTopics = [...prevTopics];
              newTopics.push(e.target.value);
              return newTopics;
            });
          }}
          placeholder='0x0'
        />
      </div>
      <br />
      <div className='nes-field'>
        <label>Event Data</label>
        {datas.map((data, idx) => (
          <input
            key={idx}
            type='text'
            className={classNames('nes-input is-dark', {
              'is-error': invalidLog,
            })}
            value={data}
            onChange={(e) => {
              setDatas((prevDatas) => {
                const newDatas = [...prevDatas];
                if (e.target.value) {
                  newDatas[idx] = e.target.value;
                } else {
                  newDatas.splice(idx, 1);
                }
                return newDatas;
              });
            }}
            placeholder='0'
          />
        ))}
        <input
          key={datas.length}
          type='text'
          className={classNames('nes-input is-dark', {
            'is-error': invalidLog,
          })}
          value={''}
          onChange={(e) => {
            setDatas((prevDatas) => {
              const newDatas = [...prevDatas];
              newDatas.push(e.target.value);
              return newDatas;
            });
          }}
          placeholder='0'
        />
      </div>
      <br />
      {logDesc && (
        <>
          <>{logDesc.signature}</>
          <br />
          {Object.entries(logDesc.args).map(([name, arg], idx) => (
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
