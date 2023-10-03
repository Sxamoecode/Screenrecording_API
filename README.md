# Screen Recording API

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Implementation](#implementation)
## Installation
- `git clone https://...`
- add .env file to the root of folder
- `npm install` at root of folder
- run `npm run watch` to start app

## Usage

## Features
- Receives blob files in chunks of video from a screen_recorder at intervals
- add the received chunks to an array in memory
- Combine the received files and return as .mp4 file
- transcribe video data and send transcript together with video file to output

## Implementation
- **/start**: initiate array to store video chunks in memory
- **/uploading**: push chunks to array at intervals
- **/stop**: send last blob chunk to array and concatenate and combine to form whole video. Transcribe using openai whisper.
