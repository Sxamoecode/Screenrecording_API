## Hosted on render.com
`https://screenrecorder-o8m5.onrender.com/`

## Start
https://screenrecorder-o8m5.onrender.com/start  
**POST**
response: {
    'Recording started'
}

## Uploading
https://screenrecorder-o8m5.onrender.com/upload  
**PUT**:  
request: Form data
{
    file: chunks.blob
}  
response: {uploading success}

## Stop
https://screenrecorder-o8m5.onrender.com/stop  
**GET**  
response: {videoURL: video.mp4, transcript}
