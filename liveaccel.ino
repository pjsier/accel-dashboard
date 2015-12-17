// This #include statement was automatically added by the Particle IDE.
#include "InternetButton/InternetButton.h"

InternetButton b = InternetButton();

String z_val;
String y_val;
String x_val;
String results;

void setup() {
    b.begin();
}

void loop() {
    x_val = String(b.readX());
    y_val = String(b.readY());
    z_val = String(b.readZ());
    results = x_val + " " + y_val + " " + z_val;
    Particle.publish("accel", results, 1);
    // Delay 1000 milliseconds (one second) because any faster is usually throttled
    delay(1000);
}
