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

@app.route('/ml2')
def ml2():
    return render_template('ml2.html')

@app.route('/surprise')
def surprise():
    return "https://www.youtube.com/watch?v=oHg5SJYRHA0"