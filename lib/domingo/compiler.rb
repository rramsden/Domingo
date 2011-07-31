require 'sprockets'
require '../ext/sprockets'

module Domingo
  class Compiler

    ##
    # compiles every javascript file in the present working directory
    # using coffeescript and sprockets

    def self.compile

      build_path = File.join(Dir.tmpdir, [caller[0][/`(.*)'/, 1], Time.now.to_f].join("_"))

      begin
        FileUtils.mkdir(build_path)
        domingo_path = File.join(File.dirname(__FILE__), "../../")

        # compile domingo source
        %x[coffee -o #{File.expand_path(domingo_path)}/src/js -c #{File.expand_path(domingo_path)}/src/coffee]

        secretary = Sprockets::Secretary.new(
          :load_path => ["#{project_dir}/src", "#{project_dir}/src/js"],
          :source_files => ["**/*.js"],
        )

        FileUtils.mkdir("build") unless File.exist?("build")
        concatenation = secretary.concatenation
        concatenation.save_to("build/domingo.js")
      ensure
        FileUtils.rm_rf(build_path)
      end

    end

  end
end
