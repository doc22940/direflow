import { resolve } from 'path';
import ncp from 'ncp';
import mkdirp from 'mkdirp';
import { ITemplateOption } from '../types/TemplateOption';

const copyTemplate = async (options: ITemplateOption): Promise<string> => {
  const currentDirectory = process.cwd();
  const templateDirectory = resolve(__dirname, `../../templates/${options.language}`);

  const projectDirectory: string = await new Promise((projectResolve, reject) => {
    const projectDir = `${currentDirectory}/${options.projectName}`;
    mkdirp(projectDir, (err) => {
      if (err) {
        console.log(err);
        reject(new Error(`Could not create directory: ${projectDir}`));
      }

      projectResolve(projectDir);
    });
  });

  await new Promise((ncpResolve, reject) => {
    ncp.ncp(templateDirectory, projectDirectory, (err) => {
      if (err) {
        console.log(err);
        reject(new Error('Could not copy template files'));
      }

      ncpResolve();
    });
  });

  return projectDirectory;
};

export default copyTemplate;
