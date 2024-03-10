import React, { useContext, useEffect, useState } from 'react';
import {
  AddProjectMainHeader,
  MainInformationWrap,
} from 'components/CollabCreate/AddProject/elements';
import { getProjectsForCollective } from '~/apis';
import AppContext from 'context/AppContext';
import ProjectCard from 'components/Collective/CollectiveCreate/CreateCollabCollective/ProjectCard';
import { Grid } from '@mui/material';
import { ProjectCardSkeleton } from 'components/Collective/CollectiveCreate/CreateCollabCollective/ProjectCardSkeleton';
import { useTranslation } from 'react-i18next';

export const CreateCollabCollective = () => {
  const [allProjects, setAllProjects] = useState(null);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const { user } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    getAllUserProjects();
  }, []);

  const getAllUserProjects = async () => {
    setProjectsLoading(true);
    const projects = await getProjectsForCollective(user?.userId);
    setProjectsLoading(false);
    setAllProjects(projects);
  };

  return (
    <MainInformationWrap>
      <AddProjectMainHeader width={300}>
        {t('Select collabs to display on your collective page')}
      </AddProjectMainHeader>

      <Grid container columnSpacing={2.5} rowSpacing={2.5} my={4}>
        {!projectsLoading
          ? allProjects &&
            allProjects.map(
              ({ _id, title, description, compressedImages, collabType }) => (
                <Grid item xl={3} lg={4} md={6} sm={6} xs={12} key={_id}>
                  <ProjectCard
                    id={_id}
                    title={title}
                    description={description}
                    image={compressedImages[0]}
                    collabType={collabType}
                    sx={{ width: '100% !important', margin: '0 !important' }}
                  />
                </Grid>
              ),
            )
          : [...Array(9)].map((index) => (
              <Grid item xl={3} lg={4} md={6} sm={6} xs={12} key={index}>
                <ProjectCardSkeleton key={index} />
              </Grid>
            ))}
      </Grid>
    </MainInformationWrap>
  );
};
