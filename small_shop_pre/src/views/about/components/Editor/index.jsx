import React, { useState } from 'react';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export default function Editor(props) {
  const {content} = props
  return (
    <MdEditor
      previewOnly={true}
      modelValue={content}
      previewTheme="github"
      // theme='dark'
    />
  )
};

// previewTheme	
// 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'