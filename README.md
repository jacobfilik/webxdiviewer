# WebXDIViewer

A prototype viewer for git repositories containing XAFS Data Interchange Format [XDI](https://docs.xrayabsorption.org/xaslib/xdi.html) files.

The viewer is written in React/Typscript and it automatically deployed to Github pages using Github Actions. During the deployment process, XDI files are copied from a data repository, index, and added as static files to the viewer.

The code in this repo is deployed [here](http://jfilik.com/webxdiviewer/) using a fork of the XDI files frome the [XASDataLibrary].

## Deploying against a Different Data Repository

Forking the repo and changing the repository and path in the "data" workflow should deploy the webpage against the specified repository.

## Local Deploy

Manually building the project and then running the python script in the /scripts directory in a python environment with [Larch](https://xraypy.github.io/xraylarch/) installed should generate the XDI file index (a .json file). Copying the index with the XDI files to the dist folder should let the viewer be used locally (but I have not tested this...).
