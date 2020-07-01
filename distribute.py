"""
Run all the necessary tools to bundle the web files in the dist folder
"""

from pathlib import Path
from distutils.dir_util import copy_tree
from subprocess import run
import shutil



JS = ['anim.js', 'lib.js', 'privacy.js']

def copy_assets():
    "Copy the fonts and img folder to dist/"
    copy_tree('fonts', 'dist/fonts')
    copy_tree('img', 'dist/img')
    shutil.copy('favicon.ico', 'dist/favicon.ico')

def minimize_and_copy_js():
    "Minimize our own js files and copy all the bundle into dist/js"
    # First minimize
    print("Minifying the JavaScript files")
    for file in JS:
        src = Path('js') / file
        dst = src.with_suffix(".min.js")
        cmd = f'npx minify {src} > {dst}'
        print(cmd)
        run(cmd, shell=True, check=True)
    
    # Create destination dir if inexistent
    dst = Path('dist/js')
    dst.mkdir(parents=True, exist_ok=True)
    # Copy
    files = list(Path('js').glob('*.min.js'))
    files.extend(Path('js').glob('*.map'))
    files.append(Path('js/modernizr-custom.js'))
    for file in files:
        print(f'Copy {file} -> {dst}')
        shutil.copy(str(file), str(dst))

def minify_and_copy_css():
    "Compile, minimize our CSS files and copy them to dist"
    print("Compiling *.(s)css files")
    files = list(Path('scss').glob('*'))
    for file in files:
        dst = file.with_suffix('.min.css').name
        cmd = f'sass {file} {dst} --style compressed'
        print(cmd)
        run(cmd, shell=True, check=True)
    print("Copy files to dist")
    files = list(Path('.').glob('*.min.css'))
    files.extend(Path('.').glob('*.min.css.map'))
    for file in files:
        dst = 'dist' / file
        print(f'Copy {file} -> {dst}')
        shutil.copy(str(file), str(dst))


def minimize_and_copy_html():
    "Minimize our HTML files and copy them to dist"
    print("Minifying the HTML files")
    htmls = Path('.').glob('*.html')
    for html in htmls:
        dst = "dist" / html
        cmd = f'npx minify {html} > {dst}'
        print(cmd)
        run(cmd, shell=True, check=True)

def main():
    copy_assets()
    minimize_and_copy_js()
    minify_and_copy_css()
    minimize_and_copy_html()

if __name__ == '__main__':
    main()

