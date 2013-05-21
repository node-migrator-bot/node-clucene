{
  "targets": [
    {
      "target_name": "clucene_bindings",
      "cflags": ["-g", "-D_FILE_OFFSET_BITS=64", "-D_LARGEFILE_SOURCE", "-Wall"],
      "sources": [ "src/clucene_bindings.cpp" ],
      "link_settings": {
        "libraries": [
          "<(module_root_dir)/lib/libclucene-core.dylib",
          "<(module_root_dir)/lib/libclucene-shared.dylib"
        ],
      }
    }
  ]
}