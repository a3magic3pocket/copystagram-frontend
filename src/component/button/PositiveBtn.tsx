export default function PositiveButton(props: IPositiveBtn) {
  return (
    <button
      className={
        props.className ||
        "mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      }
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
