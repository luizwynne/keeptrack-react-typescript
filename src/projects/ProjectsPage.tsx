import React, { Fragment, useState, useEffect } from 'react';
import { projectAPI } from './projectAPI';
import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';
import { Project } from './Project';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../state';
import { ThunkDispatch } from 'redux-thunk';
import { ProjectState } from './state/projectTypes';
import { AnyAction } from 'redux';
import { loadProjects } from './state/projectActions';


function ProjectsPage() {

  const loading = useSelector(
    (appState: AppState) => appState.projectState.loading
  );

  const projects = useSelector(
    (appState: AppState) => appState.projectState.projects
  );

  const error = useSelector(
    (appState: AppState) => appState.projectState.error
  );

  const currentPage = useSelector(
    (appState: AppState) => appState.projectState.page
  );
  
  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

  const handleMoreClick = () => {
    dispatch(loadProjects(currentPage + 1));
  };

  useEffect(() => {
      dispatch(loadProjects(1));
  }, [dispatch]);



  

  return (
    <>
      <h1>Projects</h1>

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList projects={projects} />

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
       <div className="center-page">
         <span className="spinner primary"></span>
         <p>Loading...</p>
       </div>
      )}
    </>
  );
}

export default ProjectsPage;