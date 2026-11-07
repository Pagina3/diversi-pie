import subprocess
import os
import shutil

repo_dir = r"C:\Users\Luis\.gemini\antigravity\scratch\diversi-pie"
dist_dir = os.path.join(repo_dir, "dist")

# 1. Commit and push to master
subprocess.run("git add .", cwd=repo_dir, shell=True)
subprocess.run('git commit -m "fix: restaurar visibilidad principal de Diversi con banner oficial, logotipo y pestanas"', cwd=repo_dir, shell=True)
subprocess.run("git push origin master", cwd=repo_dir, shell=True)

# 2. Update gh-pages
temp_dir = r"C:\Users\Luis\.gemini\antigravity\scratch\temp_deploy"
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir)

shutil.copytree(dist_dir, temp_dir)

subprocess.run("git init", cwd=temp_dir, shell=True)
subprocess.run('git config user.name "Luis"', cwd=temp_dir, shell=True)
subprocess.run('git config user.email "luis@diversi.local"', cwd=temp_dir, shell=True)
subprocess.run("git checkout -b gh-pages", cwd=temp_dir, shell=True)
subprocess.run("git add .", cwd=temp_dir, shell=True)
subprocess.run('git commit -m "deploy: update Diversi view and assets"', cwd=temp_dir, shell=True)
subprocess.run("git remote add origin https://github.com/Pagina3/diversi-pie.git", cwd=temp_dir, shell=True)
res = subprocess.run("git push origin gh-pages -f", cwd=temp_dir, shell=True, capture_output=True, text=True)
print("GH-PAGES RESULT:", res.stdout, res.stderr)

shutil.rmtree(temp_dir, ignore_errors=True)
