import os

def list_files(startpath, output_file, exclude_folders):
    with open(output_file, 'w') as file:
        for root, dirs, files in os.walk(startpath):
            level = root.replace(startpath, '').count(os.sep)
            if os.path.basename(root) not in exclude_folders:
                indent = '  ' * 4 * (level)
                file.write('{}- {}\n'.format(indent, os.path.basename(root)))
                subindent = '  ' * 4 * (level + 1)
                for f in files:
                    file.write('{}- {}\n'.format(subindent, f))

if __name__ == "__main__":
    folder_path = input("Enter the folder path: ")
    output_file = input("Enter the output file name (e.g., project_structure.txt): ")
    
    if os.path.exists(folder_path):
        exclude_folders = ['node_modules']  # Folders to exclude
        list_files(folder_path, output_file, exclude_folders)
        print(f"Project structure saved to {output_file}")
    else:
        print("Folder not found.")
