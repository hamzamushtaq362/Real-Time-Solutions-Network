import { useTranslation } from 'react-i18next';
import React from 'react';
import styles from './MultiValueInput.module.css';

// const KeyCodes = {
//   comma: 188,
//   enter: 13,
// };

// const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function MultiValueInput({ tags, setTags, placeholder }) {
  const { t } = useTranslation();

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const AddressBox = ({ item, index }) => (
    <div className={styles.addressBox}>
      {item}{" "}
      <button className={styles.crossBtn} onClick={() => handleDelete(index)}>{t("x")}</button>
    </div>
  );

  return (
    <div className="app">
      <input
        className={styles.inputTag}
        name="address"
        placeholder={placeholder}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddition(e.target.value);
          }
        }}
      />
      <div className={styles.addressBoxParent}>
        {tags?.map((item, index) => (
          <AddressBox key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
