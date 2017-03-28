
import os, re, sublime, sublime_plugin, subprocess

class Hermes(sublime_plugin.WindowCommand):

    def run(self, sub_command="browse"):
        getattr(self, sub_command)()

    def run_command(self, command):
        return subprocess.Popen("""PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" """ + command, shell=True, stdout=subprocess.PIPE).stdout.read()

    def run_command_on_creative_suffix(self, command_function, file_to_match = ".*"):
        view = self.window.active_view()
        file_name = view.file_name()
        pattern = "(.*?)(Creatives)\/(.*)\/" + file_to_match
        match = re.search(pattern, file_name, re.IGNORECASE)
        if match:

            # print("match 0: %s" % (match.group(0))) # /Users/g/GitHub/project-hermes/Creatives/KeyToHappiness/TR/_300/preview.html
            # print("match 1: %s" % (match.group(1))) # /Users/g/GitHub/project-hermes/
            # print("match 2: %s" % (match.group(2))) # Creatives
            # print("match 3: %s" % (match.group(3))) # KeyToHappiness/TR/_300

            view.run_command("save")
            project_path = match.group(1)
            creative_suffix = match.group(2) + "/" + match.group(3) + "/" + os.path.basename(file_name)

            command = command_function(project_path, file_name, creative_suffix)
            output = self.run_command(command)
            print("Command: %s\nOutput:%s" % (command, output))

            return True

        return False

    def browse(self):
        self.run_command_on_creative_suffix(lambda project_path, file_name, creative_suffix: "gulp --gulpfile %sutilities/browse.js" % (project_path))

    def deploy(self):
        self.run_command_on_creative_suffix(lambda project_path, file_name, creative_suffix: "gulp --gulpfile %sutilities/deploy.js --creative %s" % (project_path, creative_suffix))

    def preview(self):
        self.run_command_on_creative_suffix(lambda project_path, file_name, creative_suffix: "gulp --gulpfile %sutilities/preview.js --creative %s" % (project_path, creative_suffix))

    def qr(self):
        self.run_command_on_creative_suffix(lambda project_path, file_name, creative_suffix: "gulp --gulpfile %sutilities/qrcode.js --creative %s" % (project_path, creative_suffix))
