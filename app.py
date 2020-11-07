from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/project')
def project():
    return render_template('project.html')

@app.route('/ml')
def ml():
    return render_template('ml.html')

@app.route('/about')
def about():
    return render_template('about.html')