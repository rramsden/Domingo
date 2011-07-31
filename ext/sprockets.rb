module Sprockets
  class SourceLine
    # make sprockets work with coffeescript or javascript
    def comment
      @comment ||= line[/^\s*(\/\/|#)(.*)/, 2]
    end 
  end
end
