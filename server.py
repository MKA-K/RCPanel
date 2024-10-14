from flask import Flask, render_template, request, send_from_directory, Response
import cv2, configparser

config = configparser.ConfigParser()
config.read('.conf')
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/panel')
def panel():
    return render_template('panel.html')

@app.route('/load/<value>')
def load(value):
    return render_template('loadscreen.html', value=value)

@app.route('/sound/<path:filename>')
def serve_sound(filename):
    return send_from_directory('static/sounds', filename)

@app.route('/image/<path:filename>')
def serve_iamge(filename):
    return send_from_directory('static/images', filename)

def generate_frames():
    cap = cv2.VideoCapture(0)
    
    # Set camera resolution
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, config.get('General', 'resulationX'))
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, config.get('General', 'resulationY'))
    
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)