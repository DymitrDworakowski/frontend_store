import style from './Loader.module.css';

function Loader({ center = false, size = 40 }) {
  const wrapperClass = center ? `${style.center}` : undefined;
  const styleSize = { fontSize: size };
  return (
    <div className={wrapperClass}>
      <div className={style.loader} style={styleSize} aria-hidden={false} />
    </div>
  );
}

export default Loader;
