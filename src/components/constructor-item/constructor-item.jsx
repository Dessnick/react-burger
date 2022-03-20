import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  removeIngredientFromCart,
  dragIngredients,
} from '../../services/slices/ingredientsSlice';

import styles from './constructor-item.module.css';

function ConstructorItem({ ingredient, index }) {
  const dispatch = useDispatch();

  const ref = React.useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'cartIngredient',
    item: () => ({ ingredient, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'cartIngredient',
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    drop: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      dispatch(dragIngredients({ drag: dragIndex, hover: hoverIndex }));
    },
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(dragIngredients({ drag: dragIndex, hover: hoverIndex }));
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  dragRef(dropRef(ref));

  return (
    <li
      className={`${styles.ingredient} mr-3 mb-4`}
      style={{ opacity }}
      ref={ref}
      draggable
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredientFromCart(ingredient))}
      />
    </li>
  );
}

ConstructorItem.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ConstructorItem;
