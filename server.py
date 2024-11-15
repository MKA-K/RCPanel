from flask import Flask, render_template, request, send_from_directory, Response, jsonify
import cv2, configparser

config = configparser.ConfigParser()
config.read('.conf')
app = Flask(__name__)

#----------------------------------------------------------------------

@app.route('/')
def index():
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


#----------------------------------------------------------------------
def generate_frames():
    cap = cv2.VideoCapture(0)
    
    # Set camera resolution
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, float(config.get('res', 'resulationX')))
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, float(config.get('res', 'resulationY')))
        
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            # Set JPEG quality for compression
            encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), int(config.get('res', 'quality'))]
            ret, buffer = cv2.imencode('.jpg', frame, encode_param)

            frame = buffer.tobytes()

        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

#----------------------------------------------------------------------


@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()  # Get the JSON data sent from the client
    button_id = data.get('button_id')  # Extract the button_id from the JSON data

    # Process the button_id as needed
    print(f'Received button ID: {button_id}')  # For debugging purposes

    # You can implement your logic based on the button_id
    # For example, you could toggle some state, send a response, etc.

    # Respond back to the client
    return jsonify({'status': 'success', 'button_id': button_id})


if __name__ == '__main__':
    app.run(
    debug=bool(config.get('runtime', 'debug')),
    host=config.get('runtime', 'host'),
    port=int(config.get('runtime', 'port'))
)
