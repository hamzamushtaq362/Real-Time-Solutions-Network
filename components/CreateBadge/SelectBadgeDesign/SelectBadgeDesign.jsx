import { useTranslation } from 'react-i18next';
import { SelectBadgeDesignTitle, SelectedBadgeDesignFlexBox } from './element';
import { SelectBadgeOption } from './SelectBadgeOption/SelectBadgeOption';
import { BadgeOption } from './BadgeOption';
import { useEffect, useState } from 'react';
import { BadgeDetailsPage } from './BadgeDetailsPage';

export const SelectBadgeDesign = ({
  page,
  watch,
  setValue,
  errors,
  control,
  userComingFromMission,
  trigger,
}) => {
  const { t } = useTranslation();
  const maxBadgeOptions = [
    {
      value: 'upload-badge',
      label: 'Upload Badge',
    },
    {
      value: 'generate-badge',
      label: 'Generate Badge',
    },
  ];

  const [selectedBadgeOption, setSelectedBadgeOption] = useState(
    maxBadgeOptions[0].value,
  );

  useEffect(() => {
    if (selectedBadgeOption === 'generate-badge') {
      setValue('aiGeneratedBadge', true);
    } else {
      setValue('aiGeneratedBadge', false);
    }
  }, [selectedBadgeOption]);

  useEffect(() => {
    trigger('image');
  }, [selectedBadgeOption]);

  const handleChangeImage = (image) => {
    setValue('image', image);
    trigger('image');
  };

  return (<>
    <SelectedBadgeDesignFlexBox>
      <SelectBadgeDesignTitle sx={{ marginTop: '2rem' }}>{t("Select Badge Design")}</SelectBadgeDesignTitle>
      {page === 0 && (
        <>
          <SelectBadgeOption
            maxBadgeOptions={maxBadgeOptions}
            selectedBadgeOption={selectedBadgeOption}
            setSelectedBadgeOption={setSelectedBadgeOption}
          />
          <BadgeOption
            selectedBadgeOption={selectedBadgeOption}
            watch={watch}
            setValue={handleChangeImage}
            errors={errors}
          />
        </>
      )}

      {page == 1 && (
        <BadgeDetailsPage
          watch={watch}
          setValue={setValue}
          errors={errors}
          control={control}
          userComingFromMission={userComingFromMission}
          trigger={trigger}
        />
      )}
    </SelectedBadgeDesignFlexBox>
  </>);
};
