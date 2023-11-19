/**
 * This file is included for refference.
 * It includes how to create a custom list group component.
 * Provides for a heading, and on-select-item events
 * @author Christopher Curtis
 */
import { useState } from "react";

// Defines the fields for the component
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

/**
 * Creates a list group component
 * @param items the items to display
 * @param heading the heading for the list
 * @param onSelectItem on-select event logic
 * @returns list group component
 */
function ListGroup({ items, heading, onSelectItem }: Props) {
  // We return a message when there are no items
  const message = items.length === 0 && <p>No items in list</p>;

  // These variables trach the state of the component, we only track the selection index
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // We return the react markup needed for the component
  return (
    <>
      <h1>{heading}</h1>
      {message}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
