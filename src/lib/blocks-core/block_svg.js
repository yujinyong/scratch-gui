/* eslint-disable */

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * 参考项目scratch-blocks修改
 * 项目地址：https://github.com/LLK/scratch-blocks
 * 文件路径：scratch-blocks --> core --> block_svg.js
 * @param Blockly ScratchBlocks
 * @param Blockly.BlockSvg
 * @param Blockly.ContextMenu
 * @param Blockly.Events
 */
export default function blockSvg(Blockly) {
    /**
     * 显示此块的上下文菜单。
     * @param {!Event} e Mouse event.
     * @private
     */
    Blockly.BlockSvg.prototype.showContextMenu_ = function (e) {
        if (this.workspace.options.readOnly || !this.contextMenu) {
            return;
        }
        // 将当前块保存在变量中以供闭包使用。
        var block = this;
        var menuOptions = [];
        if (this.isDeletable() && this.isMovable() && !block.isInFlyout) {
            // 复制
            menuOptions.push(
                Blockly.ContextMenu.blockDuplicateOption(block, e));
            if (this.isEditable() && this.workspace.options.comments) {
                // 添加注释
                menuOptions.push(Blockly.ContextMenu.blockCommentOption(block));
            }
            // 删除
            menuOptions.push(Blockly.ContextMenu.blockDeleteOption(block));
        } else if (this.parentBlock_ && this.isShadow_) {
            this.parentBlock_.showContextMenu_(e);
            return;
        }

        // 允许块添加或修改 menuOptions。
        if (this.customContextMenu) {
            this.customContextMenu(menuOptions);
        }
        Blockly.ContextMenu.show(e, menuOptions, this.RTL);
        Blockly.ContextMenu.currentBlock = this;
    };
}
