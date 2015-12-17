# Particle Internet Button Acceleration Dashboard

Quick demo that allows anyone with a Particle Internet Button to view their accelerometer
data through a live-updating dashboard.

## Setup

Before running the local code, make sure to upload the liveaccel.ino file to
[Particle Build](https://build.particle.io/), and make sure to add the Internet
Button library to your code before flashing. Also be sure to make a note of your
Photon's ID and access token, you'll need those to view your data.

Once your Photon is ready, clone the repo and run:

```
cd accel-dashboard
python -m SimpleHTTPServer 8000
```

Then, navigate to http://localhost:8000 in your browser and enter your Photon's
details in order to see the live data dashboard.
