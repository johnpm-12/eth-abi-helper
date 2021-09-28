import { Link, useRouteMatch } from 'react-router-dom';

export default function HeaderLink(props: { to: string; children: string }) {
  const match = useRouteMatch({ path: props.to, exact: true });
  return (
    <Link to={props.to}>
      <label>
        <input
          type='radio'
          className='nes-radio is-dark'
          checked={!!match}
          readOnly
        />
        <span>{props.children}</span>
      </label>
    </Link>
  );
}
